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
    
    //Boolean values
    let is_true : bool = true;
    println!("Boolean statement,{}",is_true);


    //Arrays

    //print index
    let arr : [u8; 3] = [1,2,3];
    println!("Array values,{},{},{}",arr[0],arr[1],arr[2]); //print single value of array index

    //to check length of the array 
    println!("Array length,{}",arr.len());

    //To print the whole array structure
    println!("whole array,{:?}",arr);

    //print array 
    let arr2 : [u8;3] = [2;3];
    println!("Print array multiple index with same value ,{:?}",arr2);

    //tuples
    let tuple : (u8 , bool , f32) = (2, true, 6.0);
    println!("Whole tuples{:?}", tuple);

    //single value of tuple
    println!("tuple int {},tuple bool {},tuple float{}",tuple.0,tuple.1,tuple.2);
    
    let (a,b,c) = tuple;
    println!("tuple a {},tuple b {},tuple c{}", a,b,c);




}
