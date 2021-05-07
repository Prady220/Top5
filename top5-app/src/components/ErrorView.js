export default function ErrorView(props) {
  if (props.errors) {
    return (
      <h2 style={{ color: 'red' }}>
        {props.errors}. Please try again! Please check your inputs
        <br />
        <i>If problem persists, it might be CORS issue</i>
      </h2>
    );
  }
}
