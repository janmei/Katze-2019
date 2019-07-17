using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HypeText : MonoBehaviour
{
    public TMPro.TextMeshProUGUI headline;
    public TMPro.TextMeshProUGUI subline;

    public TMPro.TextMeshProUGUI hypeSubline;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    private void Awake()
    {
        GetComponent<TMPro.TextMeshProUGUI>().text = headline.text;
        hypeSubline.text = subline.text;
    }
}
