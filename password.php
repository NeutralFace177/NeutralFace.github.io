function Login()
{
    if(empty($_POST['monkeyLavaPass']))
    {
        $this->HandleError("No Password Inputted!");
        return false;
    }

    $passcode = trim($_POST['monkeyLavaPass']);

    if ($passcode == "amongus") 
    {
        echo "Works!";
    } else
    {
        echo "Nope Bozo";
    }
}
