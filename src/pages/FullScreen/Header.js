const Header = ({ rootFontSize }) => {
  console.log('rootFontSize', rootFontSize);
  const style = {
    width: '100%',
    height: '100%',
    background: 'black',
    color: 'white',
    fontSize: '0.2rem',
  };
  return <div style={style}>Header</div>;
};

export default Header;
