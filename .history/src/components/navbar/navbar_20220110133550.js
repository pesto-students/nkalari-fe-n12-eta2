function Navbar() {
    const [isVisible, setVisible] = React.useState(false);
    return (
      <div className={`App ${isVisible ? "show" : ""}`}>
        <nav className="side-nav">
          <a href="#">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="icon"
            >
              <path
                d="M18.677 19.607L12.962 13.891C10.4196 15.6985 6.91642 15.2564 4.90285 12.8739C2.88929 10.4915 3.03714 6.96361 5.24298 4.75802C7.44824 2.55147 10.9765 2.40298 13.3594 4.41644C15.7422 6.42989 16.1846 9.93347 14.377 12.476L20.092 18.192L18.678 19.606L18.677 19.607ZM9.48498 5.00001C7.58868 4.99958 5.95267 6.3307 5.56745 8.18745C5.18224 10.0442 6.15369 11.9163 7.89366 12.6703C9.63362 13.4242 11.6639 12.8529 12.7552 11.3021C13.8466 9.75129 13.699 7.64734 12.402 6.26402L13.007 6.86402L12.325 6.18402L12.313 6.17202C11.5648 5.4192 10.5464 4.99715 9.48498 5.00001Z"
                fill="#2E3A59"
              ></path>
            </svg>
            explore
          </a>
          <a href="#">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="icon"
            >
              <path
                d="M15 22H9V20H15V22ZM15 19H9L8.777 17C8.65703 16.3385 8.45863 15.6936 8.186 15.079C7.832 14.579 7.463 14.152 7.106 13.735C5.79411 12.5053 5.03465 10.7978 5 9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9C18.9593 10.7868 18.2057 12.4831 16.907 13.711L16.89 13.731C16.534 14.148 16.166 14.58 15.819 15.075C15.5466 15.6912 15.3476 16.3373 15.226 17L15 19ZM12 4C9.23995 4.00331 7.00331 6.23995 7 9C7 10.544 7.644 11.293 8.618 12.428C8.988 12.86 9.408 13.348 9.818 13.919C10.3156 14.8858 10.6555 15.9259 10.825 17H13.176C13.3499 15.929 13.6892 14.8916 14.182 13.925C14.582 13.354 15.001 12.863 15.37 12.431L15.385 12.413C16.357 11.273 17 10.52 17 9C16.9967 6.23995 14.7601 4.00331 12 4Z"
                fill="#2E3A59"
              ></path>
            </svg>
            Your Quiz
          </a>
          <a href="#">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgb(0,0,0)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon"
            >
              <circle cx="12" cy="8" r="7"></circle>
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
            </svg>
            certificates
          </a>
        </nav>
  
        <main className="">
          <button className="btn-c-primary" onClick={()=>setVisible((curr)=>!curr)}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21 16H3V14H21V16ZM21 10H3V8H21V10Z" fill="#2E3A59"></path>
            </svg>
          </button>
        </main>
      </div>
    );
  }
  
export default Navbar;
  