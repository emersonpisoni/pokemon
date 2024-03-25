import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { PokemonState, fetchPokemons } from "../../app/store/pokemon-slice"
import { AppDispatch } from "../../app/store/store"
import { useDispatch } from "react-redux"
import { Dispatch, SetStateAction } from "react"

type PaginationSectionType = {
  pokemonDataCount: number
  currentPage: number
  itemsPerPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
}

export function PaginationSection({ pokemonDataCount, currentPage, itemsPerPage, setCurrentPage }: PaginationSectionType) {
  const dispatch = useDispatch<AppDispatch>()
  const totalPageCount = Math.ceil(pokemonDataCount / itemsPerPage)
  const siblingCount = 4
  const DOTS = '...'

  const range = (start: number, end: number) => {
    let length = end - start + 1;

    return Array.from({ length }, (_, idx) => idx + start);
  };

  function handlePagination(page: number) {
    setCurrentPage(page)
    const offset = page * itemsPerPage - itemsPerPage

    dispatch(fetchPokemons(offset))
  }

  function pagesToShow() {
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    /*
  Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
*/
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    /*
      We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    /*
      Case 2: No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    /*
      Case 3: No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {

      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    /*
      Case 4: Both left and right dots to be shown
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }

  return <Pagination className="fixed bottom-0 p-4 bg-black/90 text-white">
    <PaginationContent>
      <PaginationItem aria-disabled>
        {
          <PaginationPrevious
            onClick={() => handlePagination(currentPage - 1)}
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            className={
              currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
            }
          />
        }
      </PaginationItem>
      {pagesToShow()?.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return <PaginationItem key={`dots-${index}`}>
            <PaginationEllipsis />
          </PaginationItem>
        }
        return <PaginationItem key={`pagination-item-${pageNumber}`} >
          <PaginationLink className={`${currentPage === pageNumber ? 'text-black' : ''} `} isActive={currentPage === pageNumber} onClick={() => handlePagination(Number(pageNumber))}>{pageNumber}</PaginationLink>
        </PaginationItem>
      })}
      <PaginationItem>
        {<PaginationNext
          onClick={() => handlePagination(currentPage + 1)}
          aria-disabled={currentPage >= totalPageCount}
          tabIndex={currentPage >= totalPageCount ? -1 : undefined}
          className={
            currentPage >= totalPageCount ? "pointer-events-none opacity-50" : undefined
          }
        />}
      </PaginationItem>
    </PaginationContent>
  </Pagination>
}