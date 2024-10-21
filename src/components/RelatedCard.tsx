import { ToolOverview } from "@/models/ToolOverview";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Link } from "react-router-dom";

interface props {
    result: ToolOverview
}

function trimmedText(text: string) {
    const cutoff = 100
    if (text.length < cutoff)
        return text

    text = text.substring(0, cutoff)
    const lastSpace = text.lastIndexOf(" ")
    text = text.substring(0, lastSpace) + "..."
    return text
}

function RelatedCard({ result }: props) {
    return (
        <Link to={`/item/${result.id}`}>
            <Card className="mb-4 max-w-md hover:bg-muted">
                <CardHeader>
                    <CardTitle>{result.label}</CardTitle>
                    <CardDescription>
                        <a href={result.accessibleAt}>
                            {result.accessibleAt}
                        </a>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {trimmedText(result.description)}
                </CardContent>
            </Card >
        </Link>
    );
}

export default RelatedCard