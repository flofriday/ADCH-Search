import { ToolOverview } from "@/models/ToolOverview";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface props {
    result: ToolOverview
}

function trimmedText(text: string) {
    const cutoff = 240
    if (text.length < cutoff)
        return text

    text = text.substring(0, cutoff)
    const lastSpace = text.lastIndexOf(" ")
    text = text.substring(0, lastSpace) + "..."
    return text
}

function SearchResultCard({ result }: props) {
    return (
        <Card className="mb-4">
            <CardHeader>
                <CardTitle>{result.label}</CardTitle>
                <CardDescription>
                    <a className="break-words" href={result.accessibleAt}>
                        {result.accessibleAt}
                    </a>
                </CardDescription>
            </CardHeader>
            <CardContent>

                <p >
                    {trimmedText(result.description)}
                </p>
                <p className="mt-4">
                    By: {result.contributors.length == 0 ? <i>Unknown</i> :
                        result.contributors.join(", ")
                    }
                </p>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button asChild>
                    <Link to={`/item/${result.id}`}>
                        More
                    </Link>
                </Button>
            </CardFooter>
        </Card >
    );
}

export default SearchResultCard