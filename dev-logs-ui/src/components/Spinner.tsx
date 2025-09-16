import ClipLoader from 'react-spinners/ClipLoader';

interface SpinnerProps {
  loading: boolean;
}

const override = {
  display: 'block',
  margin: '100px auto',
};

const Spinner = ({ loading }: SpinnerProps) => {
  return <ClipLoader color="#2b7fff" loading={loading} cssOverride={override} size={150} />;
};

export default Spinner;
