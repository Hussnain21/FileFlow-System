import { shallowEqual, useSelector } from "react-redux";
import Elements from "../Elements/Elements";
import { useMemo } from "react";

const HomePageComp = () => {
  const folders = ["New folder", "new folder 2"];
  const files = [{ name: "New file" }, { name: "new file 2" }];

  const { isLoading, allUserFolders } = useSelector(
    (state) => ({
      isLoading: state.elements.isLoading,
      allUserFolders: state.elements.userFolders,
      // userFolder: state.elements.userFolders.filter(
      //   (folder) => folder.data && folder.data.parent == "root"
      // ),
    }),
    shallowEqual
  );

  const userFolders = useMemo(
    () =>
      allUserFolders.filter(
        (folder) => folder.data && folder.data.parent === "root"
      ),
    [allUserFolders]
  );

  console.log("userFolders:", allUserFolders);

  return (
    <div className="col-md-12 w-100">
      {isLoading ? (
        <h1 className="display-1 my-5 text-center">It's loading...</h1>
      ) : (
        <>
          <Elements
            title={"Created Folders"}
            type={"folder"}
            elements={userFolders}
          />
          <Elements title={"Created Files"} elements={files} />
        </>
      )}
    </div>
  );
};

export default HomePageComp;

// import { shallowEqual, useSelector } from "react-redux";
// import Elements from "../Elements/Elements";
// import { useMemo } from "react";

// const HomePageComp = () => {
//   const folders = ["New folder", "new folder 2"];
//   const files = [{ name: "New file" }, { name: "new file 2" }];

//   // Memoize the result of the useSelector hook
//   const { isLoading, userFolders } = useSelector(
//     (state) => ({
//       isLoading: state.elements.isLoading,
//       userFolders: state.elements.userFolders.filter(
//         (folder) => folder.data && folder.data.parent === "root"
//       ),
//     }),
//     shallowEqual
//   );

//   // Memoize userFolders separately
//   const memoizedUserFolders = useMemo(() => userFolders, [userFolders]);

//   console.log("userFolders:", memoizedUserFolders);

//   return (
//     <div className="col-md-12 w-100">
//       {isLoading ? (
//         <h1 className="display-1 my-5 text-center">It's loading...</h1>
//       ) : (
//         <>
//           {memoizedUserFolders && memoizedUserFolders.length > 0 ? (
//             <Elements
//               title={"Created Folders"}
//               type={"folder"}
//               elements={memoizedUserFolders[0].data || []} // Access 'data' property or provide a default value
//             />
//           ) : null}
//           <Elements title={"Created Files"} elements={files} />
//         </>
//       )}
//     </div>
//   );
// };

// export default HomePageComp;

// import { shallowEqual, useSelector } from "react-redux";
// import Elements from "../Elements/Elements";
// import { useMemo } from "react";

// const HomePageComp = () => {
//   const folders = ["New folder", "new folder 2"];
//   const files = [{ name: "New file" }, { name: "new file 2" }];

//   // Separate useSelector calls for isLoading and userFolders
//   const isLoading = useSelector(
//     (state) => state.elements.isLoading,
//     shallowEqual
//   );

//   // Memoize userFolders separately
//   const userFolders = useSelector(
//     (state) =>
//       state.elements.userFolders.filter(
//         (folder) => folder.data && folder.data.parent === "root"
//       ),
//     shallowEqual
//   );

//   // Memoize userFolders separately
//   const memoizedUserFolders = useMemo(() => userFolders, [userFolders]);

//   console.log("userFolders1:", memoizedUserFolders);
//   console.log("userFolders2:", userFolders);

//   return (
//     <div className="col-md-12 w-100">
//       {isLoading ? (
//         <h1 className="display-1 my-5 text-center">It's loading...</h1>
//       ) : (
//         <>
//           {memoizedUserFolders && memoizedUserFolders.length > 0 ? (
//             <Elements
//               title={"Created Folders"}
//               type={"folder"}
//               elements={memoizedUserFolders[0].data || []} // Access 'data' property or provide a default value
//             />
//           ) : null}
//           <Elements title={"Created Files"} elements={files} />
//         </>
//       )}
//     </div>
//   );
// };

// export default HomePageComp;
