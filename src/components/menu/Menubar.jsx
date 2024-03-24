import Collections from '../../assets/icon/collections.svg?react'
import History from '../../assets/icon/history.svg?react'
import Home from '../../assets/icon/home.svg?react'
import LikedVid from '../../assets/icon/likedVid.svg?react'
import MyContent from '../../assets/icon/myContent.svg?react'
import Settings from '../../assets/icon/settings.svg?react'
import Subscribers from '../../assets/icon/subscribers.svg?react'
import Support from '../../assets/icon/support.svg?react'
import Menu from './Menu.jsx'

function Menubar() {
  return (
    <aside className="group fixed inset-x-0 bottom-0 z-40 w-full shrink-0 border-t border-white bg-[#121212] px-2 py-2 sm:absolute sm:inset-y-0 sm:max-w-[70px] sm:border-r sm:border-t-0 sm:py-6 sm:hover:max-w-[250px] lg:sticky lg:max-w-[250px]">
      <ul className="flex justify-around gap-y-2 sm:sticky sm:top-[106px] sm:min-h-[calc(100vh-130px)] sm:flex-col">
        <Menu menuTitle="Home">
          <Home />
        </Menu>

        <Menu
          menuTitle="Liked Videos"
          className="hidden sm:block"
        >
					<LikedVid />
				</Menu>

        <Menu
          menuTitle="History"
        >
					<History />
				</Menu>

        <Menu
          menuTitle="My Content"
          className="hidden sm:block"
        >
					<MyContent />
				</Menu>

        <Menu
          menuTitle="Collections"
        >
					<Collections />
				</Menu>

        <Menu
          menuTitle="Subscribers"
        >
					<Subscribers />
				</Menu>

        <Menu
          menuTitle="Support"
          className="hidden sm:block mt-auto"
        >
					<Support />
				</Menu>

        <Menu
          menuTitle="Settings"
          className="hidden sm:block"
        >
					<Settings />
				</Menu>
      </ul>
    </aside>
  );
}

export default Menubar;
