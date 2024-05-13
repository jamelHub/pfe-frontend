

const Card = ({ children }) => {
  return (
    <div className=" border  shadow-md hover:shadow-xl  p-2 my-2">
      <div className=" flex justify-between">{children}</div>
    </div>
  );
};

export default Card;
