import propTypes from 'prop-types';
import { useEffect, useState } from 'react';
import apiRequest from '../../../hooks/apiRequest';

function SingleChannelSubscribed({data}) {
  const [subscriptionStatus, setSubscriptionStatus] = useState(false);
  const [subsCount, setSubsCount] = useState(0);

  useEffect(() => {
    getSubscriberCount();
    getSubscriptionStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // getting Subscriber Count
  async function getSubscriberCount() {
    try {
      const subsRes = await apiRequest(`/subscriptions/subscribersCount/${data.subscriber._id}`);
      setSubsCount(subsRes.data.subscribersCount);
    } catch (error) {
      console.log(error);
    }
  }

  // getting subscription status
  async function getSubscriptionStatus() {
    try {
      const subscriptionStatusRes = await apiRequest(`/subscriptions/check/toggle/${data.subscriber._id}?need=check`, "POST");
      setSubscriptionStatus(subscriptionStatusRes.data.subscriptionStatus);
    } catch (error) {
      console.log(error);
    }
  }

  // toggle subscription
  async function toggleSubscription() {
    try {
      const toggleSubscriptionRes = await apiRequest(`/subscriptions/check/toggle/${data.subscriber._id}?need=toggle`, "POST");
      setSubscriptionStatus(toggleSubscriptionRes.data.subscriptionStatus);
      getSubscriberCount();
    } catch (error) {
      console.log(error);
    }
  }
	return (
		<div className="flex w-full justify-between">
          <div className="flex items-center gap-x-2">
            <div className="h-14 w-14 shrink-0">
              <img
                src={data.subscriber.avatar}
                alt="Code Master"
                className="h-full w-full rounded-full"
              />
            </div>
            <div className="block">
              <h6 className="font-semibold">{data.subscriber.fullName}</h6>
              <p className="text-sm text-gray-300">{subsCount} Subscribers</p>
            </div>
          </div>
          <div className="block">
            <button onClick={toggleSubscription} className={`px-3 py-2 text-black ${subscriptionStatus? "bg-white": "bg-[#ae7aff]"}`}>
              <span className={`${subscriptionStatus? "": "hidden"}`}>Subscribed</span>
              <span className={`${subscriptionStatus? "hidden": ""}`}>Subscribe</span>
            </button>
          </div>
        </div>
	)
}

SingleChannelSubscribed.propTypes = {
  data: propTypes.object
}

export default SingleChannelSubscribed
