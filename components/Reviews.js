import { Pressable, View, Text, ScrollView } from "react-native"
import { styles } from "../styles/Styles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faCircleUser, faPerson } from "@fortawesome/free-solid-svg-icons"
import { useContext, useState } from "react"
import { MessageOverlay, ReviewOverlay } from "./MessageOverlay"
import { Button, Tooltip } from '@rneui/themed';
import { AuthContext } from "../Contexts"
import { Rating } from "./Rating"
import { StarRatingDisplay } from 'react-native-star-rating-widget';

/*const reviews = [{"id": 1, "writer": "Jane Doe", "comment": "I didn't really like this product but it is whatever, someone else might like it.", "rating": 2, allowContact: true},
{"id": 2, "writer": "Jane Doe", "comment": "Perfect", "rating": 1, allowContact: false},
{"id": 3, "writer": "Jane Doe", "comment": "Recommend", "rating": 5, allowContact: true}]*/

export const Reviews = ({productId, reviews}) => {
    const { user } = useContext(AuthContext);
    const [overlayOpen, setOverlayOpen] = useState(false);
    const loggedIn = user !== null;
    const [showTooltip, setShowTooltip] = useState(false);

    return(
        <View style={{flex: 4, maxHeight: 400}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5}}>
                <Text style={styles.sectionTitle}>Reviews</Text>
                <Tooltip
                    visible={showTooltip}
                    onOpen={() => setShowTooltip(true)}
                    onClose={() => setShowTooltip(false)}
                    popover={<Text style={{ color: "#fff" }}>Login to leave a review</Text>}
                    containerStyle={{width: 200}}
                >
                    <Button buttonStyle={styles.button} onPress={() => setOverlayOpen(true)} type="outline" buttontyle={{borderColor: 'rgba(127, 220, 103, 1) '}} disabled={!loggedIn}>
                        <Text >Leave review</Text>
                    </Button>
                </Tooltip>
                <ReviewOverlay visible={overlayOpen} setVisible={setOverlayOpen} productId={productId} />
            </View>
            <ScrollView style={{height: 300, borderWidth: 1, minWidth: '90%', alignContent: 'space-between', borderRadius: 5, shadowColor: 'grey', shadowRadius: 1}}>
                {reviews.length > 0 ? reviews.map((review) => {
                    return(<Review key={review._id} writer={review.writer} comment={review.content} allowContact={review.allowContact} rating={review.rating} writerId={review.writerId} loggedIn={loggedIn} user={user} />)
                }) : <NoReviews />}
            </ScrollView>
        </View>
    )
}

const NoReviews = () => {
    return(
        <View style={{alignItems: 'center', margin: 10}}>
            <Text style={{fontSize: 15}}>No reviews yet.</Text>
        </View>
    )
}

const Review = ({writer, comment, allowContact, loggedIn, rating, writerId, user}) => {
    
    const [visible, setVisible] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    const messageClick = () => {
        if(loggedIn){
            setVisible(!visible)
        } else {
            setShowTooltip(true);
        }
    }

    return(
        <View style={{borderColor: 'black', borderBottomWidth: 1, alignItems: 'stretch', marginVertical: 5, padding: 5}}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5}}>
                <Text style={{margin: 5, fontWeight: '600'}}>{writer}</Text>
                <StarRatingDisplay rating={rating} starSize={25} />
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <MessageOverlay visible={visible} setVisible={setVisible} recipient={writer} recipientId={writerId} />
                <Text style={{width: '65%', marginLeft: 5}}>{comment}</Text>
                <Tooltip
                    visible={showTooltip}
                    onOpen={() => setShowTooltip(true)}
                    onClose={() => setShowTooltip(false)}
                    popover={<Text style={{ color: "#fff" }}>Login to send a message</Text>}
                    containerStyle={{width: 200}}
                >
                    {(allowContact && (!user || user._id !== writerId)) && <Button style={styles.button} onPress={messageClick} disabled={!loggedIn} buttonStyle={{ backgroundColor: 'rgba(127, 220, 103, 1)' }}>
                        <Text>Message</Text>
                    </Button>}
                </Tooltip>
            </View>
        </View>
    )
}