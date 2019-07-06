using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CountdownController : MonoBehaviour
{
    public GameObject countdown;
    public bool isActive = false;
    Vector3 oldPos;
    Vector3 goTo;

    // Start is called before the first frame update
    void Start()
    {
        // StartCountdown();
    }

    // Update is called once per frame
    void Update()
    {
        if (isActive)
        {
            countdown.GetComponent<RectTransform>().position = Vector3.Lerp(oldPos, goTo, 1f);
        }
    }

    public void StartCountdown()
    {
        countdown.SetActive(true);
        oldPos = countdown.GetComponent<RectTransform>().position;
        StartCoroutine("Countdown");
        isActive = true;
    }

    public IEnumerator Countdown()
    {
        for(int i = 0; i < 10; ++i)
        {
            oldPos = countdown.GetComponent<RectTransform>().position;
            goTo = new Vector3(oldPos.x, oldPos.y + 690, oldPos.z);            
            yield return new WaitForSeconds(1f);
        }        
    }
}
