export default function ListComment({ data }) {
  return (
    <ul>
      {data.map((comment, index) => (
        <li key={index}>{comment}</li>
      ))}
    </ul>
  );
}
