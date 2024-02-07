fn main() {
    println!("Hello, world!");

    //signed Integer and its value
    //Data-Types : u8 , u16, u32, u64 , u128
    let a:u8 = 17;
    println!("Value of a Integer,{}",a);

    //unsigned Integer and its value
    //Data-Types : i8 , i16, i32, i64 , i128
    let b :i8 = -1;
    println!("Value of a unsigned Integer,{}",b);


    //float : used for decimals 
    let float : f32 = 10.2;
    println!("Float value,{}", float);

    //char : can only be 
    let letter = "This is Solana-dev";
    println!("characters,{}",letter);

    //solana console supports emoji's
    let emoji: &str = "\u{1F600}" ; //Simily emoji
    println!("Smiley Emoji,{}", emoji);
    
    let is_true : bool = true;
    println!("Boolean statement,{}",is_true);

}
