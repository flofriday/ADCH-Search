import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination"

interface props {
    current: number
    total: number
    onChange: (value: number) => void
}

export function CustomPagination({ current, total, onChange }: props) {

    if (total < 2) return

    return <Pagination className='my-8'>
        <PaginationContent>
            <PaginationItem>
                <PaginationPrevious href="#" onClick={() => onChange(Math.max(current - 1, 1))} />
            </PaginationItem>

            {/* Before current item */}
            {current - 1 <= 4 ?
                [...Array(current - 1).keys()].map(n => n + 1).map(index =>
                    <PaginationItem>
                        <PaginationLink href="#" onClick={() => onChange(index)}>
                            {index}
                        </PaginationLink>
                    </PaginationItem>
                )
                :
                (
                    <>
                        <PaginationItem>
                            <PaginationLink href="#" onClick={() => onChange(1)}>
                                {1}
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" onClick={() => onChange(current - 2)}>
                                {current - 2}
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" onClick={() => onChange(current - 1)}>
                                {current - 1}
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )

            }


            {/* The current item */}
            <PaginationItem>
                <PaginationLink href="#" isActive onClick={() => onChange(current)}>
                    {current}
                </PaginationLink>
            </PaginationItem>

            {/* After current item */}
            {total - current <= 4 ?
                [...Array(total - current).keys()].map(n => n + current + 1).map(index =>
                    <PaginationItem>
                        <PaginationLink href="#" onClick={() => onChange(index)}>
                            {index}
                        </PaginationLink>
                    </PaginationItem>
                )
                :
                (
                    <>
                        <PaginationItem>
                            <PaginationLink href="#" onClick={() => onChange(current + 1)}>
                                {current + 1}
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" onClick={() => onChange(current + 2)}>
                                {current + 2}
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" onClick={() => onChange(total)}>
                                {total}
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )
            }

            <PaginationItem>
                <PaginationNext href="#" onClick={() => onChange(Math.min(current + 1, total))} />
            </PaginationItem>
        </PaginationContent>
    </Pagination >
}