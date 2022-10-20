import AppHeader from "./layout/AppHeader";
import Layout from "./layout/LayOut";
import ContentBox from "./layout/ContentBox";

function App() {
  return (
    <Layout>
      <AppHeader></AppHeader>
      <ContentBox></ContentBox>
    </Layout>
  );
}

export default App;
