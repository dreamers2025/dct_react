import React, { forwardRef, useRef, useState, useCallback } from 'react';
import { useAuth } from './auth/AuthProvider';
import styles from './RenameModal.module.scss';
import { debounce } from 'lodash';

const RenameModalComponent = ({}, ref) => {
  const { fetchWithAuth,fetchUser } = useAuth();
  const inputRef = useRef();
  const [isAvailable, setIsAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const handleEditName = async (e) => {
    e.preventDefault();
    if (!fetchWithAuth) return;

    const newname = inputRef.current.value;
    setIsLoading(true);

    try {
      const response = await fetchWithAuth(
        `http://localhost:8999/api/auth/update-username?newname=${newname}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        alert('변경 실패');
        return;
      }

      alert('닉네임이 변경되었습니다!');
      ref.current?.close();
      inputRef.current.value = '';
    } catch (error) {
      console.error('닉네임 변경 중 오류 발생:', error);
      alert('오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
      fetchUser();
    }
  };

  const duplicateCheck = useCallback(
    debounce(async (e) => {
      if (!fetchWithAuth) return;

      const inputValue = e.target.value;
      if (inputValue.length === 0) return;

      try {
        const response = await fetchWithAuth(
          `http://172.30.1.40:8999/api/auth/check-duplicate?type=username&value=${inputValue}`
        );
        const result = await response.json();
        console.log(result);
        setIsAvailable(result.available);
      } catch (error) {
        console.error('중복 확인 중 오류 발생:', error);
      }
    }, 500),
    []
  );

  return (
    <dialog ref={ref} className={styles.dialog}>
      <h2>닉네임 변경</h2>
      <form method="dialog" onSubmit={handleEditName}>
        <input
          className={styles.newname}
          ref={inputRef}
          type="text"
          placeholder="새 닉네임 입력"
          id="newname"
          onChange={duplicateCheck}
          required
        />
        {!isAvailable && <p className={styles.error}>중복된 닉네임입니다.</p>}
        <div className={styles.btns}>
          <button type="submit" disabled={!isAvailable || isLoading}
            className={isAvailable?'':styles.disabled}>
            {isLoading ? '변경 중...' : '변경'}
          </button>
          <button
            type="button"
            onClick={() => {
              ref.current?.close();
              inputRef.current.value = '';
            }}
          >
            취소
          </button>
        </div>
      </form>
    </dialog>
  );
};

const RenameModal = forwardRef(RenameModalComponent);

export default RenameModal;