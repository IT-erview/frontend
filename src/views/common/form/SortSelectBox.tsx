import { CSSProperties, useState } from 'react'
import 'views/quiz/css/QuestionDetail.css'

export enum Sort {
  POPULAR = 'popular',
  LATEST = 'latest',
}

const SortSelectBox = (props: { defaultSort: Sort; onSortChanged: (sort: Sort) => void }) => {
  const [selectedSort, setSelectedSort] = useState<Sort>(props.defaultSort)

  const getSortButtonStyles = (sort: Sort) => {
    const style: CSSProperties = {
      color: '#4d4d4e',
      fontWeight: 'bold',
    }
    if (selectedSort !== sort) {
      style.color = '#6a737d'
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
      <button
        style={getSortButtonStyles(Sort.LATEST)}
        id="sort-by-latest"
        className={'sort'}
        onClick={() => onSortSelect(Sort.LATEST)}>
        최신순
      </button>
      <span className={'bar'}></span>
      <button
        style={getSortButtonStyles(Sort.POPULAR)}
        id="sort-by-like"
        className={'sort'}
        onClick={() => onSortSelect(Sort.POPULAR)}>
        인기순
      </button>
    </>
  )
}

export default SortSelectBox
