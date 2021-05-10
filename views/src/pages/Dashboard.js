import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container">
      <h2 className="text-center">Dashboard</h2>

      <Link to="/add-item" className="btn btn-secondary btn-block">
        {" "}
        Add Item{" "}
      </Link>
    </div>
  );
};

export default Dashboard;
