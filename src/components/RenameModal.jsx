import React, { forwardRef } from 'react'
import { useAuth } from './auth/AuthProvider';
import styles from './RenameModal.module.scss'

const RenameModalComponent = ({},ref) => {
  const {fetchWithAuth} = useAuth();
  const handleEditName = (newname)=>{
    const updateName = async () =>{
      const response = await fetchWithAuth(`http://localhost:8999/api/auth/update-username?newname=${newname}`,{
        method:"PUT",
        headers: {
          "Content-Type": "application/json"
        }
      });
    } 
  }

  return (
    <dialog ref={ref} className={styles.dialog}>
      <h2>닉네임 변경</h2>
      <form method="dialog" onSubmit={(e) => e.preventDefault()}>
        <input className={styles.newname} type="text" placeholder="새 닉네임 입력" id="newname" required />
        <div className={styles.btns}>
          <button type="submit">변경</button>
          <button type="button" onClick={() => ref.current?.close()}>
            취소
          </button>
        </div>
      </form>
    </dialog>
  )
}

const RenameModal = forwardRef(RenameModalComponent);

export default RenameModal