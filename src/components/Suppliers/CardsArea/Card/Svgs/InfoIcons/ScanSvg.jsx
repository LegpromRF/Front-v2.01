const Scan = ({isActive}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="19"
    viewBox="0 0 22 19"
    fill="none"
  >
    <path
      d="M21 10.0049H1"
      stroke="#D0D0D0"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fill={isActive ? '#0039fc' : '#D0D0D0'}
      d="M19.2194 5.99529V4.14709C19.2194 2.41589 17.8035 1 16.0723 1H14.5166"
      stroke="#D0D0D0"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fill={isActive ? '#0039fc' : '#D0D0D0'}
      d="M2.78125 5.99529V4.14313C2.78125 2.40895 4.18624 1.00297 5.92041 1.00099L7.51081 1"
      stroke="#D0D0D0"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fill={isActive ? '#0039fc' : '#D0D0D0'}
      d="M19.2194 10.0049V14.2932C19.2194 16.0234 17.8035 17.4403 16.0723 17.4403H14.5166"
      stroke="#D0D0D0"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fill={isActive ? '#0039fc' : '#D0D0D0'}
      d="M2.78125 10.0049V14.2972C2.78125 16.0314 4.18624 17.4373 5.92041 17.4393L7.51081 17.4403"
      stroke="#D0D0D0"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default Scan;
