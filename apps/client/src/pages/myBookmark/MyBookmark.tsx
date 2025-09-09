import { useState } from 'react';
import CardEditModal from '@shared/components/cardEditModal/CardEditModal';

const MyBookmark = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* 배경 콘텐츠 */}
      <div aria-hidden={isOpen}>
        <button onClick={() => setIsOpen(true)}>카테고리</button>
        {/* …여기에 리스트/카드 등 배경 콘텐츠 */}
      </div>

      {/* 오버레이 + 중앙 배치 */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <CardEditModal onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookmark;
