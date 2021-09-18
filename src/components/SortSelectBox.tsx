import { CSSProperties, useState } from 'react'
import 'css/QuestionDetail.css'

export const enum Sort {
  LIKED = 'liked',
  LATEST = 'createdDate',
}

const SortSelectBox = (props: { defaultSort: Sort; onSortChanged: (sort: Sort) => void }) => {
  const [selectedSort, setSelectedSort] = useState<Sort>(props.defaultSort)

  const getSortButtonStyles = (sort: Sort) => {
    const style: CSSProperties = {
      color: '#4d4d4e',
      borderColor: '#707070',
      fontWeight: 'bold',
    }
    if (selectedSort !== sort) {
      style.color = '#6a737d'
      style.borderColor = '#cdcdd5'
      style.fontWeight = 'normal'
    }
    return style
  }

  const onSortSelect = (sort: Sort) => {
    if (sort === selectedSort) return
    setSelectedSort(sort)
    props.onSortChanged(sort)
  }

  return (
    <>
      <button style={getSortButtonStyles(Sort.LATEST)} id="sort-by-latest" onClick={() => onSortSelect(Sort.LATEST)}>
        최신순
      </button>
      <button style={getSortButtonStyles(Sort.LIKED)} id="sort-by-like" onClick={() => onSortSelect(Sort.LIKED)}>
        인기순
      </button>
    </>
  )
}

export default SortSelectBox
