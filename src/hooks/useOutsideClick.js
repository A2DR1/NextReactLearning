import { useEffect } from 'react';  

const useOutsideClick = (ref, callback) => {
  const handleClickOutside = (event) => {
    event.stopPropagation();
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);

  return ref;
}
export default useOutsideClick;