import AppHeader from "./layout/AppHeader";
import Layout from "./layout/Layout";
import ContentBox from "./layout/ContentBox";

import CodeArea from "./components/CodeArea";
import FunctionHeader from "./components/FunctionHeader/FunctionHeader";
import ToolBar from "./components/ToolBar";

function App() {
  return (
    <Layout>
      <AppHeader>
        <FunctionHeader />
      </AppHeader>
      <ContentBox>
        <CodeArea />
        <ToolBar />
      </ContentBox>
    </Layout>
  );
}

export default App;
