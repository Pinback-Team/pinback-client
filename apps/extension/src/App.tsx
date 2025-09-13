import './App.css';
import DuplicatePop from './pages/DuplicatePop';
import MainPop from './pages/MainPop';
import { useState, useEffect } from 'react';
import { useGetArticleSaved } from '@apis/query/queries';
import { usePageMeta } from './hooks/usePageMeta';

const App = () => {
  const { url } = usePageMeta();
  const { data: isSaved } = useGetArticleSaved(url);

  const [isDuplicatePop, setIsDuplicatePop] = useState(false);
  const [mainPopType, setMainPopType] = useState<"add" | "edit">("add");

  useEffect(() => {
    if (isSaved?.data) {
      setIsDuplicatePop(true);
    }
  }, [isSaved]);

  const handleDuplicateLeftClick = () => {
    setIsDuplicatePop(false);
    setMainPopType("edit");
  };

  const handleDuplicateRightClick = () => {
    window.location.href = "https://www.pinback.today/";
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
