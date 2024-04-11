import { useEffect, useState } from "react";
import propTypes from 'prop-types';

function TimeAgo({ createdAt, className= "ml-1" }) {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const calculateTimeAgo = () => {
      const currentTime = new Date();
      const createdAtDate = new Date(createdAt);
      const timeDifference = currentTime - createdAtDate;

      // Convert time difference to seconds
      const seconds = Math.floor(timeDifference / 1000);

      let interval = Math.floor(seconds / 31536000);
      if (interval > 1) {
        setTimeAgo(`${interval} years ago`);
        return;
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
        setTimeAgo(`${interval} months ago`);
        return;
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
        setTimeAgo(`${interval} days ago`);
        return;
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
        setTimeAgo(`${interval} hours ago`);
        return;
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
        setTimeAgo(`${interval} minutes ago`);
        return;
      }
      setTimeAgo(`${Math.floor(seconds)} seconds ago`);
    };

    calculateTimeAgo();

    // Update time every minute to keep the displayed time updated
    const interval = setInterval(calculateTimeAgo, 60000);

    return () => clearInterval(interval);
  }, [createdAt]);

  return <span className={className}>{timeAgo}</span>;
}

TimeAgo.propTypes = {
  createdAt: propTypes.string,
  className: propTypes.string,
};

export default TimeAgo;
