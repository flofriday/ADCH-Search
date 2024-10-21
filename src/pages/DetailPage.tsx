// DetailView.js
import RelatedCard from '@/components/RelatedCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ToolDetails } from '@/models/ToolDetail';
import { Globe, MoveLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';



const DetailView = () => {
    const { id } = useParams();
    const [tool, setTool] = useState<ToolDetails | null>(null)

    useEffect(() => {
        fetchData()
    }, [id])

    const fetchData = async () => {
        try {
            const response = await fetch(`https://marketplace-api.sshopencloud.eu/api/tools-services/${id}?draft=false&approved=true&redirect=false`)
            const data = await response.json()

            console.log(data)
            setTool({
                id: data.persistentId,
                label: data.label,
                status: data.status,
                keywords: data.properties.map(p => p.value ? p.value : p.concept.label).filter(k => k),
                description: data.description,
                accessibleAt: data.accessibleAt,
                contributors: data.contributors.map(c => c.actor.name),
                imageUrls: data.media.map(m => m.info.location?.sourceUrl).filter(m => m != null),
                related: data.relatedItems
                    .filter(other => other.category == "tool-or-service")
                    .map(other => {
                        return {
                            id: other.persistentId,
                            label: other.label,
                            description: other.description,
                            accessibleAt: other.accessibleAt,
                            contributors: [],
                        }
                    }),
            })

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    if (!tool) {
        return <div>Loading..</div>
    }

    return (
        <div className='max-w-2xl mx-auto text-start my-12'>
            <Button variant="outline" asChild>
                <Link to="/">
                    <MoveLeft />
                    Back
                </Link>
            </Button>
            <h1 className="mt-8 mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                {tool.label}
            </h1>
            <div className='mb-4'>
                <Badge
                    className='mr-2 mb-2'
                >{tool.status}
                </Badge>
                {[... new Set(tool.keywords)].map(keyword =>
                (<Badge
                    className='mr-2 mb-2'
                    key={keyword}
                    variant="secondary">{keyword}</Badge>)
                )}
            </div>

            <div className='mb-4'>
                <p className='mb-1'>
                    <b>Website: </b>
                    <a href={tool.accessibleAt}>
                        {tool.accessibleAt}
                    </a>
                </p>
                <p>
                    <b>From: </b>
                    {tool.contributors.length == 0 ? <i>Unknown</i> :
                        tool.contributors.join(", ")
                    }
                </p>
            </div>

            <p>
                {tool.description}
            </p>

            {tool.imageUrls.length > 0 &&
                <Carousel className="w-full max-w-lg mx-auto my-4">
                    <CarouselContent>
                        {tool.imageUrls.map(url => (
                            <CarouselItem key={url}>
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                            <img src={url} alt="" />
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>}

            {tool.related.length >= 1 &&
                (
                    <>
                        <h2 className='scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl mt-12 mb-4'>Related Tools:</h2>
                        {tool.related.map(other => (
                            <RelatedCard result={other} />
                        ))}
                    </>
                )
            }


        </div>
    );
};

export default DetailView;