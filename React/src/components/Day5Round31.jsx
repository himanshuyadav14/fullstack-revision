import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Virtuoso } from "react-virtuoso";

const UserCard = React.memo(({ user, onSelect }) => {
  return (
    <div onClick={() => onSelect(user)}>
      <p>{user.name}</p>
    </div>
  );
});

function UserList({ onSelectUser }) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/users", { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      });

    return () => controller.abort();
  }, []);

  // ✅ Memoized filtering
  const filtered = useMemo(() => {
    const lower = debouncedQuery.toLowerCase();
    return users.filter((u) => {
      return u.name.toLowerCase().includes(lower);
    });
  }, [users, debouncedQuery]);

  const handleSelect = useCallback(
    (user) => {
      onSelectUser(user);
    },
    [onSelectUser],
  );

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search users..."
      />
      <Virtuoso
        data={filtered}
        itemContent={(index, user) => (
          <UserCard user={user} onSelect={handleSelect} />
        )}
      />
    </div>
  );
}

export default UserList;
