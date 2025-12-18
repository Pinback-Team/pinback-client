import './App.css';
import DuplicatePop from './pages/DuplicatePop';
import MainPop from './pages/MainPop';
import { useState, useEffect } from 'react';
import { useGetArticleSaved } from '@apis/query/queries';
import { usePageMeta } from './hooks/usePageMeta';
import LogOutPop from './pages/LogOutPop';
const App = () => {
  const { url } = usePageMeta();
  const { data: isSaved } = useGetArticleSaved(url);

  const [isDuplicatePop, setIsDuplicatePop] = useState(false);
  const [mainPopType, setMainPopType] = useState<'add' | 'edit'>('add');
  const [isToken, setIsToken] = useState<boolean | null>(null);

  useEffect(() => {
    chrome.storage.local.get('token', (result) => {
      setIsToken(!!result.token);
    });
  }, []);
  useEffect(() => {
    if (isSaved?.data) {
      setIsDuplicatePop(true);
    }
  }, [isSaved]);

  const handleDuplicateLeftClick = () => {
    setIsDuplicatePop(false);
    setMainPopType('edit');
  };

  const handleDuplicateRightClick = () => {
    chrome.tabs.create({ url: 'https://www.pinback.today/' });
  };

  return (
    <>
      {/* <LogOutPop /> */}
      {isToken ? (
        isDuplicatePop ? (
          <DuplicatePop
            onLeftClick={handleDuplicateLeftClick}
            onRightClick={handleDuplicateRightClick}
          />
        ) : (
          <MainPop type={mainPopType} />
        )
      ) : (
        <LogOutPop />
      )}
    </>
  );
};

export default App;
