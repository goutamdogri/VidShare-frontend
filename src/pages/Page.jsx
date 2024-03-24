import CardVidList from "../components/CardViewVIdList/CardVidList.jsx";
import Header from "../components/Header.jsx";
import Menubar from "../components/menu/Menubar.jsx";
// import NoVid from "../components/NoVid/NoVid.jsx";

function Page() {
  return (
    <>
      <div className="h-screen overflow-y-auto bg-[#121212] text-white">
        <Header />

        <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
          <Menubar />
          
          <CardVidList />
        </div>
      </div>
    </>
  );
}

export default Page;
