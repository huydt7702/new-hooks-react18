import React, { useDeferredValue, useEffect, useId, useMemo, useState, useTransition } from 'react';
import ListComment from './ListComment';

export default function Form() {
  const id = useId();
  const [listComment, setListComment] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filterText, setFilterText] = useState('');
  const [isPending, startTransition] = useTransition();

  // const deferredValue = useDeferredValue(searchValue);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/comments');
      const comments = await res.json();

      setListComment(comments);
    };

    fetchData();
  }, []);

  const data = useMemo(() => {
    if (listComment.length === 0) return [];

    return listComment.map(({ name, id }) => {
      const index = name.indexOf(filterText);

      return (
        <React.Fragment key={id}>
          {index === -1 ? (
            <p>{name}</p>
          ) : (
            <p>
              {name.slice(0, index)}
              <span style={{ backgroundColor: 'yellow' }}>{name.slice(index, index + filterText.length)}</span>
              {name.slice(index + filterText.length)}
            </p>
          )}
        </React.Fragment>
      );
    });
  }, [filterText, listComment]);

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);

    startTransition(() => {
      setFilterText(e.target.value);
    });
  };

  return (
    <React.Fragment>
      <h3>Form</h3>
      <label htmlFor={id}>Search:</label>
      <input type="text" value={searchValue} name="name" id={id} onChange={handleSearchValue} />
      {/* {isPending ? <p>Loading...</p> : <ListComment data={data} />} */}
      <ListComment data={data} />
    </React.Fragment>
  );
}
