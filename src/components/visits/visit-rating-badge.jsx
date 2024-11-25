export default function VisitRatingBadge({ rating }) {
    const getRatingColor = (rating) => {
        console.log(rating);
        if (rating >= 8) {
            return "success";
        } else if (rating >= 6) {
            return "secondary";
        } else if (rating >= 4) {
            return "primary";
        } else if (rating >= 2) {
            return "warning";
        } else if (rating === undefined || rating === null || rating === 0) {
            return "dark";
        } else {
            return "danger";
        }
    };

    return (
        <span className={`badge text-bg-${getRatingColor(rating)}`}>{rating ? rating : "?"}</span>
    );
}