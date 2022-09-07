import Pagination from 'react-js-pagination'

const MypagePagination = (props: {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  totalElement: number
}) => {
  function handlePageChange(page: number) {
    props.setPage(page)
  }
  return (
    <Pagination
      activePage={props.page}
      itemsCountPerPage={5}
      totalItemsCount={props.totalElement}
      pageRangeDisplayed={5}
      prevPageText="<"
      nextPageText=">"
      onChange={handlePageChange}
    />
  )
}
export default MypagePagination
