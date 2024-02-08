import "./Elements.css";

const Elements = ({ title, elements }) => {
  return (
    <div className="w-100">
      <h4 className="text-center border-bottom">{title}</h4>
      <div className="row gap-2 p-4 flex-wrap">
        {elements.map((element, index) => {
          return (
            <p key={index * 55} className="col-md-2 p-2 text-center border">
              {" "}
              {element}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Elements;
