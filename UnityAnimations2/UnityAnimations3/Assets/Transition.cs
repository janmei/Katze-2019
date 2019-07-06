using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Transition : MonoBehaviour
{
    public bool transitionActive = false;

    // Start is called before the first frame update
    void Start()
    {
        StartTransition();
    }

    // Update is called once per frame
    void Update()
    {
        if (transitionActive)
        {
            if(GetComponent<RectTransform>().localScale.x <= 40)
            {
                this.GetComponent<RectTransform>().localScale += new Vector3(0.1f, 0.1f, 0.1f);
            } else
            {
                transitionActive = false;
            }
        }        
    }

    public void StartTransition()
    {
        this.transitionActive = true;
    }
}
