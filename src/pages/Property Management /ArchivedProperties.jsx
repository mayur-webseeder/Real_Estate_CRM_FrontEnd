import { useCallback, useEffect } from "react";
import {
  setPropertiesPage,
  setPropertiesSearch,
  setStatusFilter,
} from "../../store/propertiesSlice";
import { useDispatch, useSelector } from "react-redux";
import TableFrame from "../../components/table/TableFrame";
import TableRow from "../../components/table/TableRow";
import TableCell from "../../components/table/TableCell";
import PaginationControls from "../../components/table/PaginationControls";
import CommonInput from "../../components/input/CommonInput";
import usePropertiesService from "../../services/usePropertiesService";
import useIcon from "../../hooks/useIcon";
import CommonSelect from "../../components/input/CommonSelect";
import LinkBtn from "../../components/buttons/LinkBtn";

function ArchivedProperties() {
  const dispatch = useDispatch();

  const {
    properties = [],
    search,
    statusFilter,
    page,
    totalPropertiesPage,
  } = useSelector((state) => state.properties);
  const { fetchArchivedProperties } = usePropertiesService();
  const icons = useIcon();

  const columns = [
    { title: <input type="checkbox" />, key: "selector" },
    { title: "Title", key: "title" },
    { title: "Listing Type", key: "listingType" },
    { title: "Category", key: "category" },
    { title: "Location", key: "location" },
    { title: "Price", key: "price" },
    { title: "Status", key: "status" },
    { title: "Action", key: "action" },
  ];

  useEffect(() => {
    fetchArchivedProperties();
  }, [search, page, statusFilter]);

  const handlePrevPage = useCallback(() => {
    if (page > 1) dispatch(setPropertiesPage(page - 1));
  }, [page, dispatch]);

  const handleNextPage = useCallback(() => {
    if (page < totalPropertiesPage) dispatch(setPropertiesPage(page + 1));
  }, [page, totalPropertiesPage, dispatch]);

  return (
    <div className="space-y-3 w-full border-inherit">
      {/* Header */}
      <div className="rounded-lg border p-6 mb-6 border-inherit">
        <div className="flex justify-between items-center w-full border-inherit">
          <h2 className="text-xl font-medium text-gray-900">
            Total {properties.length} leads found
          </h2>
          <div className="flex justify-center items-center gap-3">
            <CommonInput
              type="search"
              placeholder="Search"
              value={search}
              onChange={(e) => dispatch(setPropertiesSearch(e.target.value))}
            />
            <CommonSelect
              className
              name={"status"}
              value={statusFilter}
              options={["available", "under-offer", "sold", "rented"]}
              onChange={(e) => dispatch(setStatusFilter(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="w-full border-inherit space-y-6">
        <div className="w-full overflow-auto border-inherit text-nowrap">
          <TableFrame className="border rounded-lg" columns={columns}>
            {properties.length > 0 ? (
              properties.map((property) => (
                <TableRow key={property.id || property._id}>
                  <TableCell>
                    <input type="checkbox" />
                  </TableCell>
                  <TableCell>
                    <LinkBtn stub={"property/details/" + property._id}>
                      {" "}
                      {property.title}
                    </LinkBtn>
                  </TableCell>
                  <TableCell>{property.listingType}</TableCell>
                  <TableCell>{property.category}</TableCell>
                  <TableCell>{property.location}</TableCell>
                  <TableCell>{property.price}</TableCell>
                  <TableCell>{property.status}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <div className="flex justify-center items-center w-full">
                  No properties found
                </div>
              </TableRow>
            )}
          </TableFrame>
        </div>

        {/* Pagination */}
        <PaginationControls
          className="justify-end w-full"
          page={page}
          totalPages={totalPropertiesPage}
          onNext={handleNextPage}
          onPrev={handlePrevPage}
        />
      </div>
    </div>
  );
}

export default ArchivedProperties;
