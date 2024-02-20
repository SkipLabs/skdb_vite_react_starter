import { useQuery, useSKDB } from 'skdb-react'
import './App.css'

function AddRandomRow() {
  const db = useSKDB();
  return (
    <button
      onClick={(_e) => {
        const i = Math.round(Math.random() * 1000);
        const f = Math.random();
        db.exec(
          "INSERT INTO example (intCol, floatCol, skdb_access) VALUES (@i, @f, 'read-write')",
          {i, f}
        );
      }}>
        Add Random Row
    </button>
  )
}

function ExampleTable() {
  const rows = useQuery("SELECT id, intCol, floatCol FROM example");
  const acc = rows.map(
    (row: Record<string, any>) => (
      <tr key={row.id}>
        <td>{row.id}</td>
        <td>{row.intCol}</td>
        <td>{row.floatCol}</td>
      </tr>
    )
  );
  return (
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>intCol</th>
          <th>floatCol</th>
        </tr>
      </thead>
      <tbody>{acc}</tbody>
    </table>
  )
}

function App() {
  return (
    <>
      <AddRandomRow />
      <hr />
      <ExampleTable />
    </>
  )
}

export default App
