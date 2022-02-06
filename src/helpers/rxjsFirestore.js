import { Observable } from "rxjs";
import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";

export const docData = (doc) => {
  const data = doc.data();
  const idKey = data && data.id ? "firebaseId" : "id"; // if original data contains an id..

  return {
    ...data,
    [idKey]: doc.id,
  };
};

export const ObservableFromQuery = (query) => {
  return new Observable((subscriber) => {
    const unsubscribe = onSnapshot(query, (snapshot) =>
      subscriber.next(snapshot)
    );
    return () => unsubscribe();
  });
};

export const useStream = (stream, initialValue = null) => {
  const [current, setCurrent] = useState(initialValue);

  useEffect(() => {
    const sub = stream.subscribe(setCurrent);
    return () => sub.unsubscribe();
  }, []);

  return current;
};
