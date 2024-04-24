import {
  View,
  Text,
  Image,
  useWindowDimensions,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import tw from "twrnc";
import { SvgXml } from "react-native-svg";
import {
  backIcon,
  clockIcon,
  heartIcon,
  menuIcon,
  navigateIcon,
  phoneIcon,
  starIcon,
  truckIcon,
} from "@/utils/SvgImages";
import {
  burgerData,
  comboData,
  pizzaData,
  popularData,
} from "@/utils/mockData";

const Home = () => {
  const { height, width } = useWindowDimensions();
  const scrollViewRef = useRef<any>(null);
  const sections = [
    { id: 1, title: "Popular", content: popularData },
    { id: 2, title: "Combo", content: comboData },
    { id: 3, title: "Pizza", content: pizzaData },
    { id: 4, title: "Burger", content: burgerData },
  ];
  const [activeSection, setActiveSection] = useState(sections[0].id);

  const [isSticky, setIsSticky] = useState(false);
  const threshold = height * 0.2; // Adjust this value based on your desired scroll threshold

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    setIsSticky(scrollY >= threshold);
  };

  const handlePress = (sectionId: number) => {
    setActiveSection(sectionId);

    // Ensure the scrollViewRef is available before scrolling
    if (scrollViewRef.current) {
      // Calculate the offset for the target section
      const sectionIndex = sections.findIndex(
        (section) => section.id === sectionId
      );
      const targetOffset = sectionIndex * height; // Adjust based on your section layout

      // Scroll to the target offset with smooth animation
      scrollViewRef.current.scrollTo({ y: targetOffset, animated: true });
    }
  };

  const TextComponent = ({ icon, text }: { icon: string; text: string }) => {
    return (
      <View style={tw`flex-row items-center gap-[8px]`}>
        <SvgXml xml={icon} />
        <Text style={tw`text-[16px] text-[#fff]`}>{text}</Text>
      </View>
    );
  };

  const ButtonComponent = ({
    text,
    onPress,
    active,
  }: {
    text: string;
    onPress: () => void;
    active: boolean;
  }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={tw.style(
          `items-center h-[46px] px-[25px] justify-center bg-[#1C1C24] rounded-[10px]`,
          active ? `border border-[#FFC107]` : ``
        )}
      >
        <Text
          style={tw.style(
            `text-[14px] font-medium`,
            active ? `text-[#FFC107]` : `text-[#fff]`
          )}
        >
          {text}
        </Text>
      </TouchableOpacity>
    );
  };

  const FoodComponent = ({
    image,
    title,
    subTitle,
    price,
    counter,
  }: {
    image: any;
    title: string;
    subTitle: string;
    price: string;
    counter: number;
  }) => {
    return (
      <View
        style={tw`flex-row items-center bg-[#1C1C24] py-[25px] px-[15px] rounded-[14px] mx-[16px]`}
      >
        <View style={tw`flex-row items-center gap-[18px] flex-1`}>
          <Image source={image} style={tw`w-[78px] h-[77px]`} />
          <View>
            <Text style={tw`text-[14px] font-bold text-[#fff]`}>{title}</Text>
            <Text style={tw`text-[13px] text-[#fff]`}>{subTitle}</Text>
            <Text style={tw`text-[16px] font-bold text-[#fff]`}>${price}</Text>
          </View>
        </View>
        <View style={tw`flex-row items-center gap-[10px]`}>
          <TouchableOpacity
            style={tw`w-[30px] h-[30px] bg-[#4E4E5D] rounded-[6px] justify-center items-center`}
          >
            <Text style={tw`text-[18px] font-bold text-[#fff]`}>-</Text>
          </TouchableOpacity>
          <Text style={tw`text-[16px] font-bold text-[#fff]`}>{counter}</Text>
          <TouchableOpacity
            style={tw`w-[30px] h-[30px] bg-[#4E4E5D] rounded-[6px] justify-center items-center`}
          >
            <Text style={tw`text-[18px] font-bold text-[#fff]`}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={tw`flex-1 bg-[#13131B]`}>
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Image
            source={require("assets/images/banner.png")}
            style={tw.style(`w-full`, {
              height: Math.round(height * 0.4),
            })}
          />

          <Pressable
            style={tw`bg-[#ffff] rounded-full left-[20px] top-[40px] absolute justify-center items-center h-[45px] w-[45px]`}
          >
            <SvgXml xml={backIcon} />
          </Pressable>
          <Pressable
            style={tw`bg-[#ffff] rounded-full absolute right-[20px] top-[40px] justify-center items-center h-[45px] w-[45px]`}
          >
            <SvgXml xml={menuIcon} />
          </Pressable>
        </View>

        <View style={tw`flex-row items-center mx-[20px] mt-[20px]`}>
          <View style={tw`flex-row items-center flex-1 gap-[15px]`}>
            <Image source={require("assets/images/logo.png")} />

            <Text style={tw`text-[24px] font-semibold text-[#fff]`}>
              The Food Cafe
            </Text>
          </View>
          <Pressable
            style={tw`bg-[#1C1C24] rounded-full justify-center items-center h-[40px] w-[40px]`}
          >
            <SvgXml xml={heartIcon} />
          </Pressable>
        </View>

        <View
          style={tw`bg-[#1C1C24] rounded-[10px] pt-[20px] p-[20px] gap-[15px] mx-[16px] mt-[25px]`}
        >
          <TextComponent icon={starIcon} text="Ratings: 4.5 ( 502 reviews )" />
          <TextComponent icon={clockIcon} text="Delivers in 15-20 min" />
          <TextComponent icon={truckIcon} text="Free delivery" />
        </View>

        <View style={tw`flex-row items-center mx-[16px] mt-[25px] gap-[25px]`}>
          <TouchableOpacity
            style={tw`flex-row items-center flex-1 h-[54px] justify-center gap-[15px] bg-[#1C1C24] rounded-[10px]`}
          >
            <SvgXml xml={phoneIcon} />
            <Text style={tw`text-[14px] font-medium text-[#fff]`}>
              Call Now
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex-row items-center flex-1 h-[54px] justify-center gap-[15px] bg-[#1C1C24] rounded-[10px]`}
          >
            <SvgXml xml={navigateIcon} />
            <Text style={tw`text-[14px] font-medium text-[#fff]`}>
              Navigate
            </Text>
          </TouchableOpacity>
        </View>

        {!isSticky && (
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={tw`flex-1`}
          >
            <View style={tw.style(`flex-row gap-[15px] ml-[16px] mt-[35px]`)}>
              {sections.map((section) => (
                <ButtonComponent
                  key={section.id}
                  text={section.title}
                  onPress={() => handlePress(section.id)} // Pass section ID to handlePress
                  active={section.id === activeSection} // Apply active styling for selected button
                />
              ))}
            </View>
          </ScrollView>
        )}

        <View style={tw`flex-1 mt-[30px]`}>
          <Text style={tw`text-[20px] font-medium text-[#fff] ml-[20px]`}>
            Popular ({`${popularData.length}`})
          </Text>
          <View style={tw`gap-[18px] mb-[50px] mt-[15px]`}>
            {popularData.map((item) => (
              <FoodComponent
                key={item.id}
                title={item.title}
                subTitle={item.subTitle}
                image={item.image}
                counter={item.counter}
                price={item.price}
              />
            ))}
          </View>

          <Text style={tw`text-[20px] font-medium text-[#fff] ml-[20px]`}>
            Combo ({`${comboData.length}`})
          </Text>
          <View style={tw`gap-[18px] mb-[50px] mt-[15px]`}>
            {comboData.map((item) => (
              <FoodComponent
                key={item.id}
                title={item.title}
                subTitle={item.subTitle}
                image={item.image}
                counter={item.counter}
                price={item.price}
              />
            ))}
          </View>

          <Text style={tw`text-[20px] font-medium text-[#fff] ml-[20px]`}>
            Pizza ({`${pizzaData.length}`})
          </Text>
          <View style={tw`gap-[18px] mb-[50px] mt-[15px]`}>
            {pizzaData.map((item) => (
              <FoodComponent
                key={item.id}
                title={item.title}
                subTitle={item.subTitle}
                image={item.image}
                counter={item.counter}
                price={item.price}
              />
            ))}
          </View>

          <Text style={tw`text-[20px] font-medium text-[#fff] ml-[20px]`}>
            Burger ({`${burgerData.length}`})
          </Text>
          <View style={tw`gap-[18px] mb-[50px] mt-[15px]`}>
            {burgerData.map((item) => (
              <FoodComponent
                key={item.id}
                title={item.title}
                subTitle={item.subTitle}
                image={item.image}
                counter={item.counter}
                price={item.price}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      {isSticky && (
        <View
          style={tw.style(
            isSticky && `absolute left-0 right-0 bg-[#13131B]`,
            {}
          )}
        >
          <View
            style={tw`flex-row items-center justify-between mx-[20px] mt-[50px] mb-[20px]`}
          >
            <Pressable
              style={tw`bg-[#ffff] rounded-full justify-center items-center h-[45px] w-[45px]`}
            >
              <SvgXml xml={backIcon} />
            </Pressable>
            <Text style={tw`text-[24px] font-semibold text-[#fff]`}>
              The Food Cafe
            </Text>
            <Pressable
              style={tw`bg-[#ffff] rounded-full justify-center items-center h-[45px] w-[45px]`}
            >
              <SvgXml xml={menuIcon} />
            </Pressable>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={tw`flex-1`}
          >
            <View style={tw.style(`flex-row gap-[15px] ml-[16px] mb-[20px]`)}>
              {sections.map((section) => (
                <ButtonComponent
                  key={section.id}
                  text={section.title}
                  onPress={() => handlePress(section.id)} // Pass section ID to handlePress
                  active={section.id === activeSection} // Apply active styling for selected button
                />
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Home;
