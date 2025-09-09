import { useState } from 'react';
import CardEditModal from '@shared/components/cardEditModal/CardEditModal';

const MyBookmark = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* 클릭 시 모달 열기 */}
      <button onClick={() => setIsOpen(true)}>카테고리</button>

      {/* isOpen 상태로 렌더링 제어 */}
      {isOpen && (
        <CardEditModal
          onClose={() => {
            setIsOpen(false); // 모달 내부 닫기 버튼이 호출
          }}
        />
      )}
    </div>
  );
};

export default MyBookmark;
