import { useGetArticleDetail, useGetArticleSaved } from '@apis/query/queries';
import { useEffect, useState } from 'react';
import './App.css';
import { usePageMeta } from './hooks/usePageMeta';
import DuplicatePop from './pages/DuplicatePop';
import LogOutPop from './pages/LogOutPop';
import MainPop from './pages/MainPop';

const App = () => {
  const { url } = usePageMeta();
  const { data: savedArticle } = useGetArticleSaved(url);
  const articleId = savedArticle?.data?.id;
  const { data: articleDetail } = useGetArticleDetail(articleId!);

  const [isDuplicatePop, setIsDuplicatePop] = useState(false);
  const [mainPopType, setMainPopType] = useState<'add' | 'edit'>('add');
  const [isToken, setIsToken] = useState(false);

  useEffect(() => {
    chrome.storage.local.get('token', (result) => {
      setIsToken(!!result.token);
    });
  }, []);

  // 이미 저장된 아티클이면 DuplicatePop 표시
  useEffect(() => {
    if (savedArticle?.data) {
      setIsDuplicatePop(true);
    }
  }, [savedArticle]);

  const handleDuplicateLeftClick = () => {
    setIsDuplicatePop(false);
    setMainPopType('edit');
  };

  const handleDuplicateRightClick = () => {
    chrome.tabs.create({ url: 'https://pinback.today/' });
  };

  console.log('savedArticle', savedArticle);
  console.log('articleId', savedArticle?.data?.articleId);

  return (
    <>
      {isToken ? (
        isDuplicatePop ? (
          <DuplicatePop
            onLeftClick={handleDuplicateLeftClick}
            onRightClick={handleDuplicateRightClick}
          />
        ) : (
          <MainPop type={mainPopType} savedData={articleDetail} />
        )
      ) : (
        <LogOutPop />
      )}
    </>
  );
};

export default App;
