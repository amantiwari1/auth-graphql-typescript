import { useHelloQuery } from './generated/graphql';

function App() {

  const { data, loading } = useHelloQuery()

  if (loading || !data) {
    return <div>Loading...</div>
  }
  return (
    <div className="App">
      {data.user[0].id}
    </div>
  );
}

export default App;
