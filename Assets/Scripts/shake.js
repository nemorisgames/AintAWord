var LowPassKernelWidthInSeconds : float = 1.0;
// The greater the value of LowPassKernelWidthInSeconds, the slower the filtered value will converge towards current input sample (and vice versa). You should be able to use LowPassFilter() function instead of avgSamples(). 
var fuego:Transform;
var bAccionado:boolean;
var tiempo_espera:float;
var tiempo_maximo:float=1;
private var AccelerometerUpdateInterval : float = 1.0 / 60.0;
private var LowPassFilterFactor : float = AccelerometerUpdateInterval / LowPassKernelWidthInSeconds; 

private var lowPassValue : Vector3 = Vector3.zero; // should be initialized with 1st sample

private var  IphoneAcc : Vector3;
private var IphoneDeltaAcc : Vector3;
	
///////////////////////
function LowPassFilter(newSample : Vector3) {
		lowPassValue = Vector3.Lerp(lowPassValue, newSample, LowPassFilterFactor);
		return lowPassValue;
}

///////////////////////
function FixedUpdate () {

if(bAccionado) 
{
	tiempo_espera=tiempo_espera-Time.deltaTime;
	

}
if(tiempo_espera<=0)
{
tiempo_espera=0;
bAccionado=false;

}	IphoneAcc = Input.acceleration;
	IphoneDeltaAcc = IphoneAcc-LowPassFilter(IphoneAcc);
	
	if(Mathf.Abs(IphoneDeltaAcc.x)>=.3)
		{
          	       // Do something
		}
	if(Mathf.Abs(IphoneDeltaAcc.y)>=.3)
		{
             // Do something
	}
	if(Mathf.Abs(IphoneDeltaAcc.z)>=.7 && !bAccionado)
		{
                   // AQUI SE DETECTA EL MOVIMIENTO
			bAccionado=true;
			tiempo_espera=tiempo_maximo;
			gameObject.SendMessage("shake");
               // Do something
                
		}		
}