import CollectionsSVG from '../../assets/icon/collections.svg?react'
import HistorySVG from '../../assets/icon/history.svg?react'
import HomeSVG from '../../assets/icon/home.svg?react'
import LikedVidSVG from '../../assets/icon/likedVid.svg?react'
import MyContentSVG from '../../assets/icon/myContent.svg?react'
import SettingsSVG from '../../assets/icon/settings.svg?react'
import SubscribersSVG from '../../assets/icon/subscribers.svg?react'
import SupportSVG from '../../assets/icon/support.svg?react'
import Menu from './Menu.jsx'
import propTypes from 'prop-types'

function Menubar({className="", menuSpanClass=""}) {
  return (
    <aside className={`group fixed inset-x-0 bottom-0 z-40 w-full shrink-0 border-t border-white bg-[#121212] px-2 py-2 sm:absolute sm:inset-y-0 sm:max-w-[70px] sm:border-r sm:border-t-0 sm:py-6 sm:hover:max-w-[250px] ${className}`}>
      <ul className="flex justify-around gap-y-2 sm:sticky sm:top-[106px] sm:min-h-[calc(100vh-130px)] sm:flex-col">
        <Menu menuTitle="Home" menuSpanClass={menuSpanClass}>
          <HomeSVG />
        </Menu>

        <Menu menuTitle="Liked Videos" className="hidden sm:block" menuSpanClass={menuSpanClass}>
					<LikedVidSVG />
				</Menu>

        <Menu menuTitle="History" menuSpanClass={menuSpanClass}>
					<HistorySVG />
				</Menu>

        <Menu menuTitle="My Content" className="hidden sm:block" menuSpanClass={menuSpanClass}>
					<MyContentSVG />
				</Menu>

        <Menu menuTitle="Collections" menuSpanClass={menuSpanClass}>
					<CollectionsSVG />
				</Menu>

        <Menu menuTitle="Subscribers" menuSpanClass={menuSpanClass}>
					<SubscribersSVG />
				</Menu>

        <Menu menuTitle="Support" className="hidden sm:block mt-auto" menuSpanClass={menuSpanClass}>
					<SupportSVG />
				</Menu>

        <Menu menuTitle="Settings" className="hidden sm:block" menuSpanClass={menuSpanClass}>
					<SettingsSVG />
				</Menu>
      </ul>
    </aside>
  );
}

Menubar.propTypes = {
  className: propTypes.string,
  menuSpanClass: propTypes.string
}

export default Menubar;
