import './App.css';
import DuplicatePop from './pages/DuplicatePop';
import MainPop from './pages/MainPop';
import { useState, useEffect } from 'react';
import { useGetArticleSaved } from '@apis/query/queries';
import { usePageMeta } from './hooks/usePageMeta';

const App = () => {
  const { url } = usePageMeta();
  const { data: isSaved } = useGetArticleSaved(url);

  // 팝업 상태
  const [isDuplicatePop, setIsDuplicatePop] = useState(false);
  // MainPop 모드 상태: "add" | "edit"
  const [mainPopType, setMainPopType] = useState<"add" | "edit">("add");

  // API 결과에 따라 초기 상태 결정
  useEffect(() => {
    if (isSaved?.data) {
      // 저장된 아티클이 있다면 DuplicatePop 먼저 열기
      setIsDuplicatePop(true);
    }
  }, [isSaved]);

  const handleDuplicateLeftClick = () => {
    // 팝업 닫고 → MainPop을 edit 모드로 보여줌
    setIsDuplicatePop(false);
    setMainPopType("edit");
  };

  const handleDuplicateRightClick = () => {
    // 대시보드 이동 같은 처리
    window.location.href = "/dashboard";
  };

  return (
    <>
      {isDuplicatePop ? (
        <DuplicatePop
          onLeftClick={handleDuplicateLeftClick}
          onRightClick={handleDuplicateRightClick}
        />
      ) : (
        <MainPop type={mainPopType} savedData={isSaved?.data}/>
      )}
    </>
  );
};

export default App;
