use core::num;

fn main() {
    println!("Hello, world!");

    //signed Integer and its value
    //Data-Types : u8 , u16, u32, u64 , u128
    let a:u8 = 17;
    println!("Value of a Integer : {}",a);

    //unsigned Integer and its value
    //Data-Types : i8 , i16, i32, i64 , i128
    let b :i8 = -1;
    println!("Value of a unsigned Integer : {}",b);


    //float : used for decimals 
    let float : f32 = 10.2;
    println!("Float value : {}", float);

    //char : can only be 
    let letter = "This is Solana-dev";
    println!("characters : {}",letter);

    //solana console supports emoji's
    let emoji: &str = "\u{1F600}" ; //Simily emoji
    println!("Smiley Emoji : {}", emoji);
    
    //Boolean values
    let is_true : bool = true;
    println!("Boolean statement : {}",is_true);


    //Arrays

    //print index
    let arr : [u8; 3] = [1,2,3];
    println!("Array values, {}, {}, {}",arr[0],arr[1],arr[2]); //print single value of array index

    //to check length of the array 
    println!("Array length : {}",arr.len());

    //To print the whole array structure
    println!("whole array : {:?}",arr);

    //print array 
    let arr2 : [u8;3] = [2;3];
    println!("Print array multiple index with same value  : {:?}",arr2);

    //tuples
    let tuple : (u8 , bool , f32) = (2, true, 6.0);
    println!("Whole tuples : {:?}", tuple);

    //single value of tuple
    println!("tuple int {},tuple bool {},tuple float {}",tuple.0,tuple.1,tuple.2);
    
    let (a,b,c) = tuple;
    println!("tuple a {},tuple b {},tuple c {}", a,b,c);

    //function
    println!("function to check num is even {}", is_even(2));

    //Mutablity
    let mut num:u8 = 10; //use `mut` keyword to mutate the value
    num = 12;
    println!("value of num : {}",num);

    //array and slices
    let array = [1,2,3];
    let slice = &array[1..3];
    println!("whole array : {:?}",array);
    println!("slice value : {:?}",slice);


    //strings
    let string : &str = "Hello World!";
    let str_slice = &string[..6];
    
    println!("Value of string {}",str_slice);

    //to use String functionalities 
    let mut test : String = String::from("Hello World");

    //to push a character in the given string
    test.push('1');
    
    //to push a string in the given string
    test.push_str("Tiger Ka HUKUM");
    
    //to replace a string with the given string
    test = test.replace("Hello", "HUKUM");
    
    test = test.replace("World", "");

    println!("{}", test);

    //conditional statements

    //if else statements

    let n:u32 = 3;

    if n > 0 {
        println!("value greater than zero");
    }
    else if n == 0 {
        println!("Value equals to zero");
    }
    else {
        println!("Value less than zero");
    }
    
    //for loop

    for i in 1..6 {
        println!(" {}", i);
    }

    println!("End of for loop");
    //`switch` which is `match` here 
    let n:u32 = 5;
    
    match n {
        0 => println!("0"),
        1 | 2 => println!("1,2"),
        3..=4 => println!("3,4"),
        _ =>println!("default")

    }

    // structs 
    let _name: String = String :: from("peocock");
    let bird: Bird = Bird{name : "pecock".to_owned(), attack : 5};

    bird.print_name();



}

//write a function to check whether give number is odd or even
pub fn is_even(num : u8) -> bool {
    let digit :u8 = num % 2;
    digit == 0
}


    //syntax 
    struct Bird {
        name : String,
        attack : u64
    }
    
    //implementation of struct

    impl Bird {
        fn print_name(&self){
            println!("{}" ,self.name)
        }
    }