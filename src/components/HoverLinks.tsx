import "./styles/style.css";

const HoverLinks = ({ text, cursor }: { text: string; cursor?: boolean }) => {
  return (
    <div className="hover-link" data-cursor={!cursor && `disable`}>
      <span className="hover-text" data-text={text}>
        {text}
      </span>
      <div className="hover-underline"></div>
    </div>
  );
};

export default HoverLinks;
