import CardVidList from "../components/CardViewVIdList/CardVidList.jsx";
import Header from "../components/Header.jsx";
import Menubar from "../components/menu/Menubar.jsx";
import propTypes from "prop-types"
// import NoVid from "../components/NoVid/NoVid.jsx";

function Page({ endPoint = '' }) {
  return (
    <>
      <div id="scrollingDiv" className="h-screen overflow-y-auto bg-[#121212] text-white">
        <Header />

        <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
          <Menubar />

          <CardVidList endPoint={endPoint} />
        </div>
      </div>
    </>
  );
}

Page.propTypes = {
  endPoint: propTypes.string,
};

export default Page;
