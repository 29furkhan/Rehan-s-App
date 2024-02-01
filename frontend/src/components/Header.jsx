const Header = ({ title, handleLogout }) => {
  return (
    <>
      <header className="bg-app text-center py-2">
        <div className="container d-flex align-items-center">
          <img className="icons img-icon ml-2" src="/images/stethoscope.png" alt="Icon 2" />
          <h1 className="display-6 mb-0">
            {title}
          </h1>
          <img className="icons img-icon ml-2" src="/images/doctors.png" alt="Icon 2" />
          <button onClick={handleLogout} className="btn btn-danger">
            <i className="fa fa-sign-out"></i>
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;